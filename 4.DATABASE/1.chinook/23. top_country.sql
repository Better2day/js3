-- 23. top_country.sql
-- Which country's customers spent the most?

SELECT c.Country,
       sum(i.Total) AS "Total Sales"
  FROM invoices i
  JOIN customers c ON i.CustomerId = c.CustomerId
 GROUP BY c.Country
 ORDER BY "Total Sales" DESC
 LIMIT 1;
