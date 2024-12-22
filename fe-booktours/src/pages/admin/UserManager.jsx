import React, { Fragment, useEffect, useRef, useState } from "react";
import AccountService from "../../services/AccountService";
import Pagination from "../../components/admin/Pagination";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  DatabaseIcon,
  ExclamationIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import DataService from "../../services/DataService";

const authorities = [
  "ROLE_ADMIN",
  "ROLE_TOUR_MANAGER",
  "ROLE_HOTEL_MANAGER",
  "ROLE_FLIGHT_MANAGER",
];
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectUser, setSelectUser] = useState(0);
  const [pageLimit, setPageLimit] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    document.title = "Quản lý người dùng";
    window.scrollTo(0, 0);

    const fetchUsers = async () => {
      try {
        const response = await AccountService.getAllUsers(
          pageLimit.page,
          pageLimit.limit
        );
        // console.log(response);
        if (response.status === 200) {
          setUsers(response.data);
          // console.log(response.data?.length);

          setRoles(response.data[0].roles);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [pageLimit]);

  useEffect(() => {
    setRoles(users[selectUser]?.roles);
  }, [selectUser]);

  const handleGrantRevoke = async () => {
    // console.log(roles);

    try {
      const response = await AccountService.grantRevokeRole(
        users[selectUser].email,
        roles
      );
      // console.log(response);
      if (response.status === 200) {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (email) => {
    // Hỏi người dùng có chắc chắn muốn xóa không
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      return;
    }
    try {
      const response = await AccountService.deleteUser(email);
      if (response.status === 200) {
        alert("Xóa tài khoản thành công");
        const newUsers = users.filter((user) => user.email !== email);
        setUsers(newUsers);
      }else{
        alert("Xóa tài khoản thất bại, " + response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed  inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            </TransitionChild>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusIcon
                      className="h-6 w-6 text-sky-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Cấp quyền cho người dùng
                    </DialogTitle>
                    <div className="mt-2">
                      <fieldset className="space-y-5">
                        <legend className="sr-only">Notifications</legend>
                        {authorities.map((authority, index) => (
                          <div
                            className="relative flex items-start"
                            key={index}
                          >
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                checked={roles?.includes(authority)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setRoles([...roles, authority]);
                                  } else {
                                    setRoles(
                                      roles.filter((role) => role !== authority)
                                    );
                                  }
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="comments"
                                className="font-medium text-gray-700"
                              >
                                {authority}
                              </label>
                            </div>
                          </div>
                        ))}
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto sm:text-sm"
                    onClick={handleGrantRevoke}
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Thông tin các người dùng
            </h1>
            <p className="text-gray-500 italic">
              Quản lý các thông tin của người dùng
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              {/* border-2 border-dashed border-gray-200 */}
              <div className="rounded-lg">
                <div className="mt-5 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Mã người dùng
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Mail
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tên
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Điện thoại
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Địa chỉ
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Số lần đặt tour
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {users?.map((user, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  <div className="max-w-sm">
                                    <span className="truncate">{user.id}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.phone === null ? "Chưa có" : user.phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.address === null
                                    ? "Chưa có"
                                    : user.address}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.bookingHistories?.length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <p
                                    className="cursor-pointer text-sky-600 hover:text-sky-700"
                                    onClick={() => {
                                      setOpen(true);
                                      setSelectUser(index);
                                    }}
                                  >
                                    Phân quyền
                                  </p>
                                  <p
                                    className="cursor-pointer text-red-500 hover:text-red-600"
                                    onClick={() => handleDeleteUser(user.email)}
                                  >
                                    Xóa tài khoản
                                  </p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {users?.length === 0 && (
                          <div className="text-center py-4 text-gray-500 h-52">
                            Không có dữ liệu
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Pagination
                  page={pageLimit.page}
                  limit={pageLimit.limit}
                  onNext={() => {
                    if (users?.length === 10) {
                      setPageLimit({
                        ...pageLimit,
                        page: pageLimit.page + 1,
                      });
                    }
                  }}
                  onPrevious={() => {
                    if (pageLimit.page > 1) {
                      setPageLimit({
                        ...pageLimit,
                        page: pageLimit.page - 1,
                      });
                    }
                  }}
                />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default UserManagement;
