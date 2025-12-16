-- 22. sales_per_country.sql
-- Provide a query that shows the total sales per country.

SELECT BillingCountry,
       sum(Total) AS "Total Sales"
  FROM invoices
 GROUP BY BillingCountry;
 