const BASE_URL = "http://localhost:3000/api"

interface IMenuItemProps {
  name: string;
  category: string
  menuId: string
}


const HTTP_METHOD = {
  POST(data: IMenuItemProps) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  PUT(data: IMenuItemProps) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

const request = async (url: string, option?: RequestInit) => {
  try {
    const res = await fetch(url, option);
    return res.json();
  }
  catch(e) {
    alert("에러가 발생했습니다.");
    console.error(e);
  }
};

const requestWithoutJson = async (url: string, option?: RequestInit) => {
  try {
    const res = await fetch(url, option);
    return res;
  } catch (e) {
    alert("에러가 발생했습니다.");
    console.error(e);
  }
};

const MenuApi = {
  async getAllMenuByCategory(category: string) {
    return request(`${BASE_URL}/category/${category}/menu`);
  },
  async createMenu(category: string, name: string) {
    return request(
      `
      ${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
  },
  async updateMenu({ category, name, menuId }: IMenuItemProps) {
    return request(
      `
      ${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    );
  },
  async toggleSoldOutMenu({ category, menuId }: IMenuItemProps) {
    return request(
      `${BASE_URL}/api/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    );
  },
  async deleteMenu({ category, menuId }: IMenuItemProps) {
    return requestWithoutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
  },
};

export default MenuApi
