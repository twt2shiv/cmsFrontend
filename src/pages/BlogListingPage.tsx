import styled from "styled-components";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlogCard from "@/components/ui/BlogCard";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsAsync } from "@/features/blog/blogSlice";
import { Skeleton } from "@/components/ui/skeleton"

const BlogListingPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { blogPosts ,deleteBlog,loading} = useSelector((state: RootState) => state.blog);
  useEffect(()=>{
    dispatch(fetchBlogsAsync())
  },[deleteBlog])
  const blogList = blogPosts?.data
 
  return (
    <Wrapper>
      <div className="action">
        <Select>
          <SelectTrigger className="w-[180px] border-none outline-none text-customText font-semibold">
            <SelectValue placeholder="Filter" className="text-customText" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All (10)</SelectItem>
            <SelectItem value="published">Published (5)</SelectItem>
            <SelectItem value="unpublish">Unpublish (5)</SelectItem>
            <SelectItem value="trash">Trash (2)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="blogs">
        {
          loading ? (
       <div className="skeletons w-[100%] flex flex-col gap-[20px]">
          <div className="flex gap-3 w-[100%]">
              <Skeleton className="w-[150px] h-[80px] rounded" />
              <div className="flex flex-col gap-5 w-[100%]">
                <Skeleton className="w-[100%] h-[30px] rounded" />
                <Skeleton className="w-[100%] h-[20px] rounded" />
              </div>
          </div>
          <div className="flex gap-3 w-[100%]">
              <Skeleton className="w-[150px] h-[80px] rounded" />
              <div className="flex flex-col gap-5 w-[100%]">
                <Skeleton className="w-[100%] h-[30px] rounded" />
                <Skeleton className="w-[100%] h-[20px] rounded" />
              </div>
          </div>
          <div className="flex gap-3 w-[100%]">
              <Skeleton className="w-[150px] h-[80px] rounded" />
              <div className="flex flex-col gap-5 w-[100%]">
                <Skeleton className="w-[100%] h-[30px] rounded" />
                <Skeleton className="w-[100%] h-[20px] rounded" />
              </div>
          </div>
          <div className="flex gap-3 w-[100%]">
              <Skeleton className="w-[150px] h-[80px] rounded" />
              <div className="flex flex-col gap-5 w-[100%]">
                <Skeleton className="w-[100%] h-[30px] rounded" />
                <Skeleton className="w-[100%] h-[20px] rounded" />
              </div>
          </div>
        </div>):
        (
          blogList?.map((blog: any) => <BlogCard key={blog._id} blog={blog}/>)
        )
        }
       
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  select {
    font-weight: 500;
  }
  .blogs {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;
export default BlogListingPage;
