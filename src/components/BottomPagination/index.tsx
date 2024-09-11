import { Button, Stack, Typography } from "@mui/material";
import { useAppStore } from "../../store";
const BottomPagination = () => {
  const { limit, offset, setOffset } = useAppStore((state) => ({
    limit: state.limit,
    offset: state.offset,
    setOffset: state.setOffset,
  }));
  return (
    <Stack
      bgcolor={"#919191EE"}
      boxShadow={5}
      direction="row"
      gap={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      p={2}
    >
      <Button
        variant="contained"
        color="secondary"
        disabled={offset === 0}
        size="large"
        onClick={() => {
          setOffset(offset - limit);
        }}
      >
        Prev
      </Button>
      <Typography color="common.white" fontWeight="bold" variant="body2">
        Page {offset / limit + 1}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => {
          setOffset(offset + limit);
        }}
      >
        Next
      </Button>
    </Stack>
  );
};

export default BottomPagination;
