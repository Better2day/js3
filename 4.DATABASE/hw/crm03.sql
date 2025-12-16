-- 3. 특정 사용자가 주문한 유니크한 상품명의 목록을 구하시오
-- 고객은 crm01.sql에서 선택한 'f01499a4-2345-426a-a6ad-446202e675cb' 계속 사용

-- SELECT DISTINCT i.Name AS 상품명,
SELECT i.Name AS 상품명,
       count(i.Name)
  FROM orders o
  JOIN users u ON o.UserId = u.Id
  JOIN orderitems oi ON o.Id = oi.OrderId
  JOIN items i ON oi.ItemId = i.Id
 WHERE u.Id = 'f01499a4-2345-426a-a6ad-446202e675cb'
 GROUP BY i.Name;

-- ※ 상품명은 같지만 Id 및 단가가 다른 상품도 있으니 질의할 때 주의!
--   (여러 브랜드에서 같은 상품명의 상품을 판매하므로, 의도적으로 이렇게 데이터 생성)
