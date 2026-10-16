import { products, type MenuProduct } from "@/lib/menu-data";
export interface MenuRepository { listActive(): Promise<MenuProduct[]>; findById(id: string): Promise<MenuProduct | null>; }
export class LocalMenuRepository implements MenuRepository {
  async listActive() { return products; }
  async findById(id: string) { return products.find((product) => product.id === id) ?? null; }
}
// A future Prisma or AppSheet-backed repository can implement the same contract.
export const menuRepository: MenuRepository = new LocalMenuRepository();
