import React from 'react';
import { Button, Table } from '@mantine/core';
import axiosWebClient from '@/services/AxiosWebClient';
import { useAppDispatch, useAppSelector } from '@/redux';
import { setUsers } from './Home.slice';

export function HomePage() {
  const { users: usersData } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  const getData = () => {
    axiosWebClient.get('/users').then((response) => {
      console.log(response.data);
      dispatch(setUsers(response.data));
    });
  };

  const handleLoadUsers = () => getData();

  return (
    <>
      <Button onClick={handleLoadUsers}>Load Users</Button>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Full Name</Table.Td>
            <Table.Td>Email</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {usersData?.map((user: any) => (
            <Table.Tr key={user.email}>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
            </Table.Tr>
          ))}
          {usersData?.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={2}>No Users Found</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </>
  );
}
