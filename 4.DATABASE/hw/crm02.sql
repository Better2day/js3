-- 2. 특정 사용자가 주문한 상점명과 상품명을 모두 출력하시오
-- 고객은 crm01.sql에서 선택한 'f01499a4-2345-426a-a6ad-446202e675cb' 계속 사용

SELECT u.Name AS 고객명,
       s.Name AS 상점명,
       i.Name AS 상품명,
       o.OrderAt AS 주문시간
  FROM orders o
  JOIN users u ON o.UserId = u.Id
  JOIN stores s ON o.StoreId = s.Id
  JOIN orderitems oi ON o.Id = oi.OrderId
  JOIN items i ON oi.ItemId = i.Id
 WHERE u.Id = 'f01499a4-2345-426a-a6ad-446202e675cb'
 ORDER BY 주문시간, 상점명, 상품명;
