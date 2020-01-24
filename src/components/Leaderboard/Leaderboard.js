import React, { Component } from 'react';
import Card from './LeaderboardCard';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topUsers: []
    };
  }

  componentDidMount() {
    fetch('https://face-finder-12.herokuapp.com/leaderboard')
      .then(response => response.json())
      .then(users => {
        this.setState({ topUsers: users });
      })
      .catch(err => 'error getting leaderboard');
  }

  render() {
    const { topUsers } = this.state;

    return (
      <div className="leaderboard">
        {topUsers.map((user, i) => {
          return <Card key={i} user={user} />;
        })}
      </div>
    );
  }
}

export default Leaderboard;
