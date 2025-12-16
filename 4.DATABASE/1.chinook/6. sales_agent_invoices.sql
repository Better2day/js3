-- 6. sales_agent_invoices.sql
-- Provide a query that shows the invoices associated with each sales agent.
-- The resultant table should include the Sales Agent's full name.

SELECT i.*, (e.LastName ||' '|| e.First) AS AgentFullName
  FROM invoices i
  JOIN customers c ON i.CustomerId = c.CustomerId
  JOIN employees e ON c.SupportRepId = e.employeeId;
