import React, { Fragment, useEffect, useState } from "react";
import MenuCyberbugs from "../../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../../components/Cyberbugs/ModalCyberBugs.js/ModalCyberBugs";
import SidebarCyberbugs from "../../../components/Cyberbugs/SidebarCyberbugs";
import parse from "html-react-parser";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../../components/Cyberbugs/Form/FormEditProject";
import {
  Table,
  Tag,
  Space,
  Button,
  Avatar,
  Popconfirm,
  message,
  Popover,
  AutoComplete,
} from "antd";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

export default function ProjectManagement(props) {
  //get data from reducers
  const dispatch = useDispatch();
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducers.projectList
  );

  const searchRef = useRef(null);

  const { userSearchs } = useSelector((state) => state.UserCyberBugsReducers);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_ALL_PROJECT_SAGA" });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`/projectDetail/${record.id}`}> {text}</NavLink>;
      },
      sorter: (item2, item1) => {
        return item2.projectName
          .trim()
          .toLowerCase()
          .localeCompare(item1.projectName.trim().toLowerCase());
      },
      sortDirections: ["descend"],
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let contentJSX = parse(text);

    //     return <div>{contentJSX}</div>;
    //   },
    // },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryId",
      sorter: (item2, item1) => {
        return item2.categoryName
          .trim()
          .toLowerCase()
          .localeCompare(item1.categoryName.trim().toLowerCase());
      },
      sortDirections: ["descend"],
    },
    {
      title: "Creator",
      key: "categoryId",
      dataIndex: "description",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        return item2.creator?.name.localeCompare(item1.creator?.name);
      },
    },
    {
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  placement="top"
                  title="Members"
                  key={index}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th> ID </th>
                            <th> Name </th>
                            <th> Avater </th>
                            <th> </th>
                          </tr>
                        </thead>

                        <tbody>
                          {record.members?.map((member, index) => {
                            return (
                              <tr key={index}>
                                <td> {member.userId} </td>
                                <td> {member.name} </td>
                                <td>
                                  {" "}
                                  <Avatar src={member.avatar} />{" "}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      const projectDelete = {
                                        projectId: record.id,
                                        userId: member.userId,
                                      };

                                      dispatch({
                                        type: "DELETE_MEMBER_PROJECT_SAGA",
                                        projectDelete,
                                      });
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  {" "}
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}

            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="rightTop"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearchs?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);
                      dispatch({
                        type: "ADD_MEMBER_PROJECT_SAGA",
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                      setValue("");
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: "GET_USER_API",
                          keyword: value,
                        });
                      }, 500);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: "OPEN_MODAL_EDIT_PROJECT",
                  title: "Edit Project",
                  ComponentContentDrawer: <FormEditProject />,
                };

                dispatch(action);

                //dispatch dữ liệu lên reducers
                dispatch({
                  type: "EDIT_PROJECT",
                  projectEdit: record,
                });
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>

            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PROJECT_SAGA",
                  projectDeleteId: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <Fragment>
      <div className="jira">
        <SidebarCyberbugs />
        <MenuCyberbugs />
        <div className="container-fluid mt-5">
          <h3>Project management</h3>
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
          </Space>
          <Table
            columns={columns}
            rowKey={"id"}
            dataSource={projectList}
            onChange={handleChange}
          />
        </div>
        <ModalCyberBugs />
      </div>
    </Fragment>
  );
}
