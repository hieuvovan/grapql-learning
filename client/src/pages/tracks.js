import React from "react";
import { Layout } from "../components";
import { gql, useQuery } from "@apollo/client";
import { QUERY } from "../constants";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */

const TRACKS = gql`
  query GetTracks {
    ${QUERY.TRACKS_FOR_HOME} {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
    }
  }
`;

const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  return (
    <Layout grid>
      <QueryResult {...{ error, loading, data }}>
        {data?.[QUERY.TRACKS_FOR_HOME]?.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}x
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
