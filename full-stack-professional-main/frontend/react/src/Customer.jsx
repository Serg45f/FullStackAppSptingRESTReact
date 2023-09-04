import { Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CreateCustomerDrawer from './components/customer/CreateCustomerDrawer.jsx';
import CardWithCustomerImage from './components/customer/CustomerCard.jsx';
import SidebarWithHeader from './components/shared/SideBar.jsx';
import { getCustomers } from './services/client.js';
import { errorNotification } from './services/notification.js';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');

  const fetchCustomers = () => {
    setLoading(true);
    getCustomers()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        errorNotification(err.code, err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </SidebarWithHeader>
    );
  }

  if (err) {
    return (
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Text mt={5}>Ooops there was an error</Text>
      </SidebarWithHeader>
    );
  }

  if (customers.length <= 0) {
    return (
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Text mt={5}>No customers available</Text>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
      <Wrap justify={'center'} spacing={'30px'}>
        {customers.map((customer, index) => (
          <WrapItem key={index}>
            <CardWithCustomerImage
              {...customer}
              imageNumber={index}
              fetchCustomers={fetchCustomers}
            />
          </WrapItem>
        ))}
      </Wrap>
    </SidebarWithHeader>
  );
};

export default Customer;
