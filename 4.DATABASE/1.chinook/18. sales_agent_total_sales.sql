-- 18. sales_agent_total_sales.sql
-- Provide a query that shows total sales made by each sales agent.

SELECT e.EmployeeId,
       e.FirstName ||' '|| e.LastName AS SalesAgent,
       sum(i.Total) AS TotalSales
  FROM invoices i
  JOIN customers c ON i.CustomerId = c.CustomerId
  JOIN employees e ON c.SupportRepId = e.EmployeeId
 WHERE e.Title = 'Sales Support Agent'
 GROUP BY e.EmployeeId;
