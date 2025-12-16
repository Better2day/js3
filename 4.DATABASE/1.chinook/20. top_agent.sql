-- 20. top_agent.sql
-- Which sales agent made the most in sales over all?

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
        GROUP BY e.EmployeeId
       );

-- 복잡하게 Sub-query까지 사용하지 않고, 아래처럼 내림차순 정렬을 이용하는 게 더 나을 듯
SELECT e.EmployeeId,
	  e.FirstName ||' '|| e.LastName AS SalesAgent,
	  sum(i.Total) AS TotalSales
  FROM invoices i
  JOIN customers c ON i.CustomerId = c.CustomerId
  JOIN employees e ON c.SupportRepId = e.EmployeeId
WHERE e.Title = 'Sales Support Agent'
GROUP BY e.EmployeeId
ORDER BY TotalSales DESC
LIMIT 1;
