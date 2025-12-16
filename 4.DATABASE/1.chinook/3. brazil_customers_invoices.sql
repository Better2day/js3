-- 3. brazil_customers_invoices.sql
-- Provide a query showing the Invoices of customers who are from Brazil.
-- The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.

SELECT c.FirstName || ' ' || c.LastName AS FullName, c.Country,
       i.InvoiceId,
       i.InvoiceDate,
       i.BillingCountry
  FROM Invoices i
  JOIN customers c ON i.CustomerId = c.CustomerId
 WHERE lower(c.Country) = 'brazil';
 