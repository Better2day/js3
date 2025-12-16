-- 19. top_2009_agent.sql
-- Which sales agent made the most in sales in 2009?
-- Hint: Use the MAX function on a subquery.

SELECT EmployeeId,
       SalesAgent,
       max(TotalSales)
  FROM (
        SELECT e.EmployeeId,
              e.FirstName ||' '|| e.LastName AS SalesAgent,
              sum(i.Total) AS TotalSales
          FROM invoices i
          JOIN customers c ON i.CustomerId = c.CustomerId
          JOIN employees e ON c.SupportRepId = e.EmployeeId
        WHERE e.Title = 'Sales Support Agent'
          AND strftime('%Y', i.InvoiceDate) == '2009'
        GROUP BY e.EmployeeId
       );
