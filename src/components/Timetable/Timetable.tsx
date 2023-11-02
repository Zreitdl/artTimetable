import { memo, useMemo } from "react";

import { Box, Typography } from "@mui/material";

import { ProjectAssignment } from "../../utils/generateTimetable";

export interface ITimetableProps {
  projectAssignments: ProjectAssignment[];
  rooms: string[];
  timeRange: string;
}

export const Timetable = memo((props: ITimetableProps) => {
  console.log("render table");

  const rows = useMemo(() => {
    console.log("counting rows at table");
    const timeRange = props.timeRange
      .split(",")
      .filter((f) => !isNaN(parseInt(f, 10)))
      .map((m) => +m);
    return timeRange;
  }, [props.timeRange]);

  return (
    <Box sx={{ borderLeft: 1, borderTop: 1, borderColor: "primary.main" }}>
      <Box sx={{ display: "flex", alignItems: "stretch" }}>
        <Box
          sx={{
            minWidth: "6em",
            borderRight: 1,
            borderBottom: 1,
            borderColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            p={1}
            m={1}
            color="primary"
          >
            time ⬇️
          </Typography>
        </Box>
        {props.rooms.map((room) => {
          return (
            <Box
              sx={{
                flex: 1,
                borderRight: 1,
                borderBottom: 1,
                borderColor: "primary.main",
              }}
              key={"room__" + room}
            >
              <Typography
                sx={{ textAlign: "center" }}
                variant="h6"
                m={1}
                p={1}
                color="primary"
              >
                {room}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {rows.map((time) => {
        return (
          <Box
            sx={{ display: "flex", alignItems: "stretch" }}
            key={"row__" + time}
          >
            <Box
              sx={{
                minWidth: "6em",
                borderRight: 1,
                borderBottom: 1,
                borderColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ textAlign: "center" }}
                variant="h6"
                p={1}
                m={1}
                color="primary"
              >
                {time}
              </Typography>
            </Box>
            {props.rooms.map((room) => {
              const project = props.projectAssignments.find(
                (f) => f.room === room && f.time === time
              );

              return (
                <Box
                  sx={{
                    flex: 1,
                    borderRight: 1,
                    borderBottom: 1,
                    borderColor: "primary.main",
                  }}
                  key={"room__" + room}
                >
                  {project && (
                    <Typography
                      variant="subtitle2"
                      color="secondary"
                      m={1}
                      p={1}
                      sx={{
                        textAlign: "center",
                        border: 1,
                        borderRadius: 2,
                        borderColor: "secondary.main",
                      }}
                    >
                      Project: {project.project} <br></br>
                      Students: {project.students.join(", ")}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
});
