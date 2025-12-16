-- 2. brazil_customers.sql
-- Provide a query only showing the Customers from Brazil.

SELECT *
  FROM customers
 WHERE lower(country) = 'brazil';
 