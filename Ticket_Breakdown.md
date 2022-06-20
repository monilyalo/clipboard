# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Approch: 
Different facilities will have different id's to be given to same agent, so instead of making many changes in existing system, lets create a new table that will be like Facility_Agents(facility_id, agent_id, custom_agent_id_by_facility) and add the new custom_agent_id_by_facility where ever required.
This will not break the core system

## 1. Create an endpoint for Facilities to save their own custom ids for each Agent.

# acceptance criteria, time/effort estimates: (2 days)
-Create an endpoint that allows custom agent id for facilities.
-Make changes in database that it can persists the data

# Implementation:
-Create an function in App as saveCustomAgentId(). Inputs: facility_id, agent_id, custom_agent_id_by_facility
-Add a new table in database as Facility_Agents(facility_id, agent_id, custom_agent_id_by_facility).
-facility_id will be foreign key to Facilities table.
-agent_id will be foreign key to Agent table.
-Equivalent test cases to be written


## 2. Changes in getShiftsByFacility() function 

# acceptance criteria, time/effort estimates: (1 day)
- getShiftsByFacility should return custom_agent_id (in meta data) instead of agent_id, but all other details from other tables will be continued to be quered with old agent id

# Implementation:
- Make changes in select query by now also joining on new table of Facility_Agents.
- Replace the key in final JSON object (agent_id with custom_agent_id_by_facility) so existing system does not break.
- Equivalent test cases to be written


## 3. Changes in generateReport() function: (1 day)
- generateReport should use existing agent_id, but provide new custom_agent_id in the PDF report for compliance

# Implementation:
- Make changes in select query by now also joining on new table of Facility_Agents.
- Replace the key in PDF (agent_id with custom_agent_id_by_facility).
- Equivalent test cases to be written.
