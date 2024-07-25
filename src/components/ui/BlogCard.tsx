import styled from "styled-components";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CopyIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { AppDispatch, RootState} from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogIdAsync } from "@/features/blog/blogSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProtectedProps {
  blog: any;
}
const BlogCard :React.FC<ProtectedProps> = ({blog}) => {
  const [id,setId] = useState<string>("")
  const dispatch: AppDispatch = useDispatch();
  const { deleteBlogLoading} = useSelector((state: RootState) => state.blog);
  return (
    <Card className="hover:shadow-md">
      <div className="left">
        <div className="thubmnail">
          <img src={blog?.thumbnail} alt="" />
        </div>
        <div className="content">
          <div className="title">
            <h2>{`${blog?.title.slice(0,100)}${blog?.title.length > 90 ? "..." : ""}`}</h2>
          </div>
          <div className="blog_detail">
            <div className="publish_date">Published. {blog?.timeAgo}</div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="user">
          {blog?.author.fullName}
          <img src="/image/user.png" alt="" />
        </div>
        <div className="action">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="p-0 border-none share">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a href="#">
                        <IoShareSocialSharp size={25}/>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share</DialogTitle>
                <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
                </div>
                <Button type="submit" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  <CopyIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-10 social">
                    <a href="#"><FaFacebookF size={20} color="#546e7a"/></a>
                    <a href="#"><FaLinkedinIn size={20} color="#546e7a"/></a>
                    <a href="#"><FaXTwitter size={20} color="#546e7a"/></a>
                    <a href="#"><FaWhatsapp size={20} color="#546e7a"/></a>
                </div>
              <DialogFooter className="flex flex-col sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link to={`/create-blog/${blog?._id}`}>
                  <FaEdit/>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <a href="#">
                  <FaEye />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>preview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialog>
            <AlertDialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <a href="#">
                      {
                        deleteBlogLoading && id === blog?._id ?   <ReloadIcon className="w-4 h-4 mr-2 animate-spin" /> :  <MdDelete />
                      }
                     
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{dispatch(deleteBlogIdAsync(blog?._id));setId(blog?._id)}}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
};
const Card = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 15px;
  .left {
    display: flex;
    gap: 10px;
    .thubmnail {
      width: 130px;
      height: 80px;
      border-radius: 3px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      h2 {
        font-size: 20px;
        font-weight: 500;
        color: #546e7a;
      }
      .publish_date {
        font-size: 15px;
        color: #546e7a;
        font-weight: 600;
      }
    }
  }
  .right {
    display: flex;
    justify-content: end;
    flex-direction: column;
    align-items: end;
    gap: 15px;
    .user {
      display: flex;
      align-items: center;
      gap: 5px;
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
      font-size: 17px;
      color: #546e7a;
      font-weight: 500;
    }
    .action {
      display: flex;
      gap: 10px;
      font-size: 23px;
      color: #546e7a;
      align-items: center;
      .share{
        &:hover{
            background-color: transparent;
            color: #546e7a;
        }
      }
      .social{
        a{
            color: #546e7a;
        }
      }
    }
  }
`;
export default BlogCard;
