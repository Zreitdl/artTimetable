import { LegacyRef, useContext, useRef, useState } from "react";

import { Button, FormControl, TextField, Typography } from "@mui/material";

import { AppContext, AppContextModel } from "../../utils/AppContext";
import { Student } from "../../utils/appModels";
import {
  generateTimetableFromAppData,
  ProjectAssignment,
} from "../../utils/generateTimetable";
import StudentsInput from "../StudentsInput/StudentsInput";
import TagsInput from "../TagsInput/TagsInput";
import { ITimetableProps, Timetable } from "../Timetable/Timetable";

const MainForm = () => {
  const { appData, updateData } = useContext<AppContextModel>(AppContext);
  const [allAssignmentsNumber, setAllAssignmentsNumber] = useState<number>();
  const [bestAssignment, setBestAssignment] = useState<
    ProjectAssignment[] | null
  >();
  const [showAssignments, setShowAssignments] = useState(false);
  const [tableProps, setTableProps] = useState<ITimetableProps>();
  const [randomAssignment, setRandomAssignment] =
    useState<ProjectAssignment[]>();

  const updateProjectsData = (data: string[]) => {
    updateData({ ...appData, projects: data });
  };

  const updateStudentsData = (data: Student[]) => {
    updateData({ ...appData, students: data });
  };

  const updateClassRoomsData = (data: string[]) => {
    updateData({ ...appData, classRooms: data });
  };

  const updateTimeRange = (data: string) => {
    updateData({ ...appData, timeRange: data });
  };

  const scrollToTable = () => {
    setTimeout(() => {
      document.getElementById("artTimeTable")?.scrollIntoView();
    }, 0);
  };

  const handleGenerateTimeTableClick = () => {
    const { allAssignmentsNumber, bestAssignment, randomAssignment } =
      generateTimetableFromAppData(appData);
    setAllAssignmentsNumber(allAssignmentsNumber);
    setBestAssignment(bestAssignment);
    setRandomAssignment(randomAssignment);
    console.log(appData.timeRange);
    setTableProps({
      projectAssignments: bestAssignment || randomAssignment,
      rooms: [...appData.classRooms],
      timeRange: appData.timeRange,
    });
    setShowAssignments(true);
    scrollToTable();
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
        <Typography variant="h5" color="inherit" noWrap>
          Time range
        </Typography>
        <TextField
          margin="normal"
          sx={{ width: "300px" }}
          label={"Time range"}
          value={appData.timeRange || ""}
          onChange={(e) => updateTimeRange(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Typography variant="h5" color="inherit" noWrap margin="0 0 10px 0">
          Generate timetable
        </Typography>
        <Button variant="contained" onClick={handleGenerateTimeTableClick}>
          Generate
        </Button>
        <>
          {showAssignments && (
            <div id="artTimeTable">
              <Typography
                sx={{ textAlign: "center" }}
                variant="h6"
                m={2}
                color="primary"
              >
                Total amount of assignments: {allAssignmentsNumber}
              </Typography>
              {!bestAssignment && randomAssignment && (
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="h6"
                  m={2}
                  color="secondary"
                >
                  Assignment is impossible, showing uncomplete assignment:
                </Typography>
              )}
              {(bestAssignment || randomAssignment) && tableProps && (
                <Timetable
                  projectAssignments={tableProps.projectAssignments}
                  rooms={tableProps.rooms}
                  timeRange={tableProps.timeRange}
                />
              )}
            </div>
          )}
        </>
      </FormControl>
    </>
  );
};

export default MainForm;
