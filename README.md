1) install modules in root and frontend

2) Rename .env.example to .env and add your DB key

3) Run "npm run dev" - to start server and client

UBER like service for freight trucks, in REST style, using MongoDB as database. Thisservice should 
help regular people to deliver their stuff and help drivers to find loads and earn some money. 
Application contains 2 roles, driver and shipper.

Acceptance criteria:

- Driver is able to register in the system;
- Driver is able to login into the system;
- Driver is able to view his profile info;
- Driver is able to change his account password;
- Driver is able to add trucks;
- Driver is able to view created trucks;
- Driver is able to assign truck to himself;
- Driver is able to update not assigned to him trucks info;
- Driver is able to delete not assigned to him trucks;
- Driver is able to view assigned to him load;
- Driver is able to interact with assigned to him load;
- Shipper is able to register in the system;
- Shipper is able to login into the system;
- Shipper is able to view his profile info;
- Shipper is able to change his account password;
- Shipper is able to delete his account;
- Shipper is able to create loads in the system;
- Shipper is able to view created loads;
- Shipper is able to update loads with status ‘NEW';
- Shipper is able to delete loads with status 'NEW';
- Shipper is able to post a load;
- Shipper is able to view shipping info;

Optional criteria:

- Ability to filter loads by status;
- Pagination for loads;
- [UI] User can interact with application through simple UI application(choose comfortable for you framework or use native js);
- [UI] Shipper is able to see his load info(pick-up address, delivery address), and [UI] driver assigned to his load coordinates on the map on UI;
- [UI] Driver is able to see info about assigned to him load(pick-up address, delivery address) on the map on UI;
- [UI] Any system user is able to interact with the system UI using a mobile phone without any issues;

