import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      {Array.from(new Array(3)).map((item, index) => (
        <Box key={index} width={210} marginRight={0.5} my={5}>
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

export default function Loader() {
  return (
    <Box overflow="hidden">
      <Media loading />
    </Box>
  );
}
