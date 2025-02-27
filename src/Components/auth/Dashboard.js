
import React, { useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Profile from './Profile';
import AddressesPage from './Address';

export default function Dashboard({ user }) {
    return (
        <div className="card">
            <TabView>
                <TabPanel header="Profile">
                   <Profile user={user}/>
                </TabPanel>
                <TabPanel header="Addresses">
                    <AddressesPage />
                </TabPanel>
                <TabPanel header="Order History">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
        </div>
    )
}
