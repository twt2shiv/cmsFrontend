import { api } from "@/utils";


export const getAllBlogPosts = (): Promise<{ data: any }> => {
    return new Promise(async (resolve) => {
      const data = await api.get(`/api/v1/blog/`)
      resolve({ data });
    });
  };
  
  export const getSingleBlog = (slug: string): Promise<{ data: any }> => {
    return new Promise(async (resolve) => {
      const data = await api.get(`/api/v1/blog/${slug}`);
      resolve({ data });
    });
  };
  export const getBlogById = (id: string | undefined): Promise<{ data: any }> => {
    console.log("api",id)
    return new Promise(async (resolve) => {
      const data = await api.get(`/api/v1/blog/edit/${id}`);
      
      resolve({ data });
    });
  };
  export const uploadBlogImage = (imageFile: any ): Promise<{ data: any }> => {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("file", imageFile);
      console.log(imageFile)
      console.log("FormData:", formData.get("file"));
      try {
        const {data} = await api.post(`/api/v1/blog/upload-file`,formData,
         {
          headers: {
            "Content-Type": "multipart/form-data"
          }
         }
        );
        resolve({ data });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  // blogApi.ts
export const createBlogPost = (): Promise<{data:any }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} =await api.post(`/api/v1/blog/craete-blog`,{Headers:{Athorization:`Bearer ${localStorage.getItem("token")}`}});
        resolve({ data });
      } catch (error) {
        reject(error);
      }
    });
  };
  export const updateBlogPost = (blodata:any): Promise<{data:any }> => {
    
    return new Promise(async (resolve, reject) => {
      try {
        const data =await  api.post(`/api/v1/blog/update-blog/${blodata.id}`)
        resolve({ data });
        console.log(data)
      } catch (error) {
        reject(error);
      }
    });
  };
  export const deleteBlog = (id: string | undefined): Promise<{ data: any }> => {
    console.log("api",id)
    return new Promise(async (resolve) => {
      const data = await api.delete(`/api/v1/blog/delete-blog/${id}`);
      resolve({ data });
    });
  };

  export const deleteThumbnail = (id: string | undefined): Promise<{ data: any }> => {
    console.log("api",id)
    return new Promise(async (resolve) => {
      const data = await api.delete(`/api/v1/blog/delete-image/${id}`);
      resolve({ data });
    });
  };