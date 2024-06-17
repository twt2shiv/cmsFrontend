import styled from "styled-components";
import { IoMenuOutline } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "@/features/auth/authSlice";
import { createblogAsync } from "@/features/blog/blogSlice";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";

export interface LayoutProps {
  children: React.ReactNode;
}
const Layout = (props: LayoutProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { blogId ,createBlogLoading} = useSelector((state: RootState) => state.blog);

  const handleLogout = () => {
    dispatch(logout());
  };
  const craeteBlog = () => {
    dispatch(createblogAsync());
  };
  if (blogId !== null) navigate(`/create-blog/${blogId}`);
  return (
    <Wrapper>
      <Navbar>
        <div className="nav_container">
          <div className="logo_icon">
            <div className="menu_icon">
              <IoMenuOutline size={30} />
            </div>
            <div className="logo">
              <img src="/image/mscorpreslogo.jpeg" alt="logo" />
            </div>
          </div>
          <div className="search">
            <span className="search_icon">
              <IoIosSearch size={25} />
            </span>
            <input type="text" placeholder="Search" />
          </div>
          <div className="logout">
            <AlertDialog>
              <AlertDialogTrigger className="border shadow-md py-2 px-5 flex justify-center align-center font-medium rounded-md"> Logout</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>do you want to logout</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="bg-red-500">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Navbar>
      <div className="main_content">
        <Sidebar>
          <div className="sidebar_container">
            <div className="new_post">
             
              {
                createBlogLoading ? <Button disabled variant={"outline"} onClick={craeteBlog} className="d-flex gap-2 shadow-md px-10 py-5 text-customText">
                 <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </Button>:
               <Button variant={"outline"} onClick={craeteBlog} className="d-flex gap-2 shadow-md px-8 py-5 text-customText">
               <FaPlus /> NEW POST
             </Button>
              }
            </div>
            <hr />
            <div className="side_links">
              <ul>
                <li>
                  <NavLink to={"/"}>
                    <MdOutlinePostAdd size={23} /> Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/stats"}>
                    <IoIosStats size={23} /> Stats
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/trash">
                    <IoTrashOutline size={23} /> Trash
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </Sidebar>
        <Main>
          <div className="main_container">{props.children}</div>
        </Main>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .main_content {
    display: grid;
    grid-template-columns: 300px 1fr;
  }
`;
const Navbar = styled.section`
  max-height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  border-bottom: 1px solid lightgray;
  overflow: hidden;
  position: relative;
  .nav_container {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
  }
  .logo_icon {
    display: flex;
    gap: 30px;
    align-items: center;
    img {
      width: 250px;
    }
    .menu_icon {
      color: #546e7a;
      cursor: pointer;
    }
  }
  .profile {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .search {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 600px;
    background-color: #546e7a33;
    padding: 10px 20px;
    border-radius: 5px;
    input {
      width: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      color: #546e7a;
      font-weight: 500;
    }
    .search_icon {
      color: #546e7a;
    }
  }
`;
const Sidebar = styled.nav`
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  border-right: 1px solid lightgray;
  .new_post {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .side_links {
    padding: 20px 0;
    ul {
      display: flex;
      flex-direction: column;
      gap: 5px;
      list-style: none;
      li a {
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 17px;
        font-weight: 600;
        padding: 10px 20px;
        color: #546e7a;
        &.active {
          color: #04afa9;
        }
        &:hover {
          background-color: #546e7a19;
        }
      }
    }
  }
`;
const Main = styled.main`
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  overflow-y: scroll;
  .main_container {
    padding: 50px 100px;
  }
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

export default Layout;
