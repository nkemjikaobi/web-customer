/**
 *
 * @param {*} attributes
 */
export const getProductAttributeIds = (attributes: any) => {
  return (
    Array.isArray(attributes) &&
    attributes.reduce((acc, attr, index) => {
      if (!attr || !attr.id) return acc;

      if (index === 0) return attr.id;
      else return `${acc},${attr.id}`;
    }, "")
  );
};
