import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBlogPost, deleteBlog, deleteThumbnail, getAllBlogPosts, getAllCategories, getBlogById, getSingleBlog, updateBlogPost, uploadBlogImage } from "./blogApi";
import { toast } from "react-toastify";


// Define the types for the state
interface BlogState {
  blogPosts: any | null;
  blogId:string | null;
  blogPost:any | null
  loading: boolean;
  singleBlog: any | null;
  imageUploadStatus: boolean;
  imageUrl : string ;
  deleteBlog: boolean;
  thumbnailDelete : boolean;
  blogUpdated:boolean;
  createBlogLoading: boolean;
  deleteBlogLoading:boolean;
  updateblogLoading:boolean;
  cateryLoading:boolean;
  categories:any | null
}

// Define the initial state with type annotations
const initialState: BlogState = {
  blogPosts: null,
  loading: true,
  singleBlog: null,
  imageUrl:"",
  imageUploadStatus :false,
  blogId:null,
  blogPost:null,
  deleteBlog :false,
  thumbnailDelete : false,
  blogUpdated: false,
  createBlogLoading:false,
  deleteBlogLoading:false,
  updateblogLoading:false,
  cateryLoading:false,
  categories:null
};

// Define the async thunks with type annotations for their payloads
export const fetchBlogsAsync = createAsyncThunk<any>("blog/fetchAllBlogs", async () => {
  const response = await getAllBlogPosts();
  return response.data;
});

export const fetchSingleBlogsAsync = createAsyncThunk<any, string>("blog/fetchSingleBlog", async (slug: string) => {
  const response = await getSingleBlog(slug);
  return response.data;
});
export const fetchBlogByIdAsync = createAsyncThunk<any, any>("blog/fetchblogbyid", async (id: string) => {
  const response = await getBlogById(id);
  return response.data;
});
export const deleteBlogIdAsync = createAsyncThunk<any,any>("blog/deleteblog", async (id: string) => {
  const response = await deleteBlog(id);
  return response.data;
});
export const uploadImageAsync = createAsyncThunk<any, File>("blog/uploadImage", async (imageFile: any) => {
    const response = await uploadBlogImage(imageFile);
    return response.data;
  });
  export const createblogAsync = createAsyncThunk<any>("blog/craeteblog", async () => {
    const response = await createBlogPost();
    return response.data;
  });
  export const updateblogAsync = createAsyncThunk<any, any>("blog/updateblog", async (data) => {
    const response = await updateBlogPost(data);
    return response.data;
  });
  export const deleteThumbnailAsync = createAsyncThunk<any,any>("blog/deleteThumbnail", async (id: string) => {
    const response = await deleteThumbnail(id);
    return response.data;
  });
  export const getAllCategoriesAsync = createAsyncThunk("blog/allcategories", async () => {
    const response = await getAllCategories();
    return response.data;
  });
// Create the slice with type annotations
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsAsync.pending, (state) => {
        state.loading = true;
        state.blogId = null
      })
      .addCase(fetchBlogsAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.blogPosts = action.payload.data.data;
        state.loading = false;
        state.deleteBlog = false
        state.imageUrl = ''
        
      })
      .addCase(fetchSingleBlogsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleBlogsAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.singleBlog = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogByIdAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.blogPost = action.payload.data.data;
        state.loading = false;
        console.log(action.payload.data)
      })
      .addCase(uploadImageAsync.pending, (state) => {
        state.imageUploadStatus = true;
      })
      .addCase(uploadImageAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.imageUploadStatus = false;
        state.imageUrl = action.payload.data.location
        console.log(action.payload)
      })
      .addCase(uploadImageAsync.rejected, (state) => {
        state.imageUploadStatus = false;
      })
      .addCase(createblogAsync.pending, (state) => {
        state.createBlogLoading = true;
      })
      .addCase(createblogAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.createBlogLoading = false;
        state.blogId = action.payload.data._id
        console.log(action.payload)
      })
      .addCase(createblogAsync.rejected, (state) => {
        state.createBlogLoading = false
      })
      .addCase(updateblogAsync.pending, (state) => {
        state.updateblogLoading = true;
        state.blogId  = null
        state.blogUpdated = false
       
      })
      .addCase(updateblogAsync.fulfilled, (state) => {
        state.updateblogLoading = false;
        state.blogUpdated = true
        
      })
      .addCase(updateblogAsync.rejected, (state) => {
        state.updateblogLoading = false
      })
      .addCase(deleteBlogIdAsync.pending, (state) => {
        state.deleteBlogLoading = true;
      })
      .addCase(deleteBlogIdAsync.fulfilled, (state) => {
        state.deleteBlog = true
        toast.success("post deleted")
        state.deleteBlogLoading = false;
      })
      .addCase(deleteBlogIdAsync.rejected, (state) => {
        state.deleteBlogLoading = false
      })
      .addCase(deleteThumbnailAsync.pending, (state) => {
        state.imageUploadStatus =true;
       
      })
      .addCase(deleteThumbnailAsync.fulfilled, (state) => {
        state.imageUploadStatus =false
        state.imageUrl = ""
        state.thumbnailDelete = true
      })
      .addCase(deleteThumbnailAsync.rejected, (state) => {
        state.imageUploadStatus = false
      })
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.cateryLoading =true;
       
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.categories = action.payload.data
        state.cateryLoading =false
        console.log( action.payload.data)
      })
      .addCase(getAllCategoriesAsync.rejected, (state) => {
        state.cateryLoading =false
      })
  },
});

// Selector with type annotation for the state
export const selectBlogs = (state: { blog: BlogState }) => state.blog;

export default blogSlice.reducer;
