import { fabric } from 'fabric';

export const drawShapesFromData = (canvas, shapeData, shapeCategories, updateInventory) => {
  if (!canvas || !shapeData) return;

  const groupedData = shapeData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  shapeCategories.forEach(category => {
    const items = groupedData[category];
    if (!items) return;

    items.forEach(item => {
      let points;
      try {
        points = Array.isArray(item.points)
          ? item.points.map(([x, y]) => ({ x, y }))
          : JSON.parse(item.points).map(([x, y]) => ({ x, y }));
        points = points.map(point => new fabric.Point(point.x, point.y));
      } catch (err) {
        console.error('Invalid points:', item.points);
        return;
      }

      if (points.length < 3 || points.some(p => p.x == null || p.y == null)) return;

      const polygon = new fabric.Polygon(points, {
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        selectable: true,
        type: 'polygon',
        dataType: category,
        properties: { type: category, ...item },
      });

      canvas.add(polygon);
    });
  });

  updateInventory?.();
  canvas.renderAll();
};
