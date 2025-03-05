export const getActiveCategoryItemIds = (categories = [], pathname = "") => {
  let active_items_ids = [];

  const findActiveItemIds = (categories, pathname, parentIds = []) => {
    categories.forEach((category) => {
      let slug_path = `/${category.link?.link_path}`;

      if (slug_path === pathname) {
        active_items_ids.push(category.id);
        active_items_ids.push(...parentIds);
      }

      if (category?.children && category?.children?.length > 0) {
        findActiveItemIds(category?.children, pathname, [
          ...parentIds,
          category?.id,
        ]);
      }
    });
  };

  findActiveItemIds(categories, pathname);

  return active_items_ids;
};
