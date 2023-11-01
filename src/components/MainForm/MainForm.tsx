import { useContext, useMemo, useState } from "react";

import { Button, FormControl, TextField, Typography } from "@mui/material";

import { AppContext, AppContextModel } from "../../utils/AppContext";
import { Student } from "../../utils/appModels";
import StudentsInput from "../StudentsInput/StudentsInput";
import TagsInput from "../TagsInput/TagsInput";
import { findBestAssignment, generateTimetable, generateTimetableFromAppData } from "../../utils/generateTimetable";

const MainForm = () => {
  const { appData, updateData } = useContext<AppContextModel>(AppContext);
  const [ allAssignments, setAllAssignments ] = useState<any>();
  const [ bestAssignment, setBestAssignment ] = useState<any>();
  const [ bestWindowCount, setBestWindowCount ] = useState(0);
  const [ showAssignments, setShowAssignments ] = useState(false);

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

  const handleGenerateTimeTableClick = () => {
    const [ assignments, best, bestWindow] = generateTimetableFromAppData(appData);
    setAllAssignments(assignments);
    setBestAssignment(best);
    setBestWindowCount(bestWindow);
    setShowAssignments(true);
  }

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
          label={'Time range'}
          value={appData.timeRange || ""}
          onChange={(e) => updateTimeRange(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Typography variant="h5" color="inherit" noWrap margin="0 0 10px 0">
          Generate timetable
        </Typography>
        <Button variant="contained" onClick={handleGenerateTimeTableClick}>Generate</Button>
        <>
        {showAssignments && (
          <>
          <h3>
            Total amount of assignments: {allAssignments.length}
          </h3>
          <h3>
            Best assignment:  <br></br><br></br>
            {bestAssignment.map((project: any) => {
              return (
              <div key={project.project}>
                Project: {project.project} <br></br>
                Room: {project.room}<br></br>
                Time: {project.time}<br></br>
                Students: {project.students.join(', ')}<br></br><br></br>
              </div>
              );
            })}
          </h3>
          </>
        )}
        </>
      </FormControl>
    </>
  );
};

export default MainForm;
