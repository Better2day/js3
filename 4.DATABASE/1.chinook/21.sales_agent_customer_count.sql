-- 21. sales_agent_customer_count.sql
-- Provide a query that shows the count of customers assigned to each sales agent.

SELECT e.EmployeeId,
       e.FirstName ||' '|| e.LastName AS SalesAgentName,
       count(c.CustomerId) AS NumbersOfCustomers
  FROM customers c
  JOIN employees e ON c.SupportRepId = e.EmployeeId
 WHERE e.title = 'Sales Support Agent'
 GROUP BY e.EmployeeId;
