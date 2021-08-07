import React, {useState} from 'react';
import styled from 'styled-components';

import AdminHeaderContainer from '../components/admin_header/AdminHeaderContainer';
import AdminContent from '../components/contents/admin';

const AdminPage = () => {
  const [adminContent, setAdminContent] = useState<string>('1');
  return (
    <>
      <AdminHeaderContainer
        adminContent={adminContent} 
        setAdminContent={setAdminContent}
      />
      <AdminContent adminContent={adminContent} />
    </>
  );
};

export default AdminPage;
