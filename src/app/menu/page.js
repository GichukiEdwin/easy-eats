"use client";
import { SectionHeaders } from "@/components/layout/SectionHeaders";
import { MenuItem } from "@/components/menu/MenuItem";
import { useCategoryData } from "@/hooks/useCategoryData";
import { useMenuItems } from "@/hooks/useMenuItems";

export default function MenuPage() {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategoryData();
  const {
    data: menuItems,
    isLoading: isMenuItemsLoading,
    isError: isMenuItemsError,
  } = useMenuItems();

  if (isCategoriesLoading || isMenuItemsLoading) {
    return <div>Loading...</div>;
  }

  if (isCategoriesError || isMenuItemsError) {
    return <div>Error loading data</div>;
  }

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((category) => (
          <div key={category.id}>
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <MenuItem key={item.id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
