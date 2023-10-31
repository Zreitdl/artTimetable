import { Button, FormControl, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TagsInput from "../TagsInput/TagsInput";
import StudentsInput from "../StudentsInput/StudentsInput";
import { AppContext, AppContextModel } from "../../utils/AppContext";
import { Student } from "../../utils/appModels";

const MainForm = () => {
  const { appData, updateData } = useContext<AppContextModel>(AppContext);

  const updateProjectsData = (data: string[]) => {
    updateData({ ...appData, projects: data });
  };

  const updateStudentsData = (data: Student[]) => {
    updateData({ ...appData, students: data });
  };

  const updateClassRoomsData = (data: string[]) => {
    updateData({ ...appData, classRooms: data });
  };

  return (
    <>
      <FormControl margin="normal" fullWidth>
        <Typography variant="h5" color="inherit" noWrap>
          Projects
        </Typography>
        <TagsInput
          initialValues={appData.projects}
          inputHead={"Project"}
          updateData={updateProjectsData}
          buttonText={"Add project"}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Typography variant="h5" color="inherit" noWrap>
          Students
        </Typography>
        <StudentsInput
          inputHead={"Student"}
          updateData={updateStudentsData}
          buttonText={"Add student"}
          projectsOptions={appData.projects}
          initialValues={appData.students}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Typography variant="h5" color="inherit" noWrap>
          Classrooms
        </Typography>
        <TagsInput
          initialValues={appData.classRooms}
          inputHead={"Classroom"}
          updateData={updateClassRoomsData}
          buttonText={"Add classroom"}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Typography variant="h5" color="inherit" noWrap margin="0 0 10px 0">
          Generate timetable
        </Typography>
        <Button variant="contained">Generate</Button>
      </FormControl>
    </>
  );
};

export default MainForm;
