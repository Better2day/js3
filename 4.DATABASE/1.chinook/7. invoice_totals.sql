-- 7. invoice_totals.sql
-- Provide a query that shows the Invoice Total, Customer name, Country and
-- Sale Agent name for all invoices and customers.

SELECT i.Total AS InvoiceTotal,
       c.FirstName ||' '|| c.LastName AS CustomerName,
       c.Country,
       e.FirstName ||' '|| e.LastName AS SaleAgentName
  FROM invoices i
  JOIN customers c ON i.CustomerId = c.CustomerId
  JOIN employees e ON c.SupportRepId = e.EmployeeId;
