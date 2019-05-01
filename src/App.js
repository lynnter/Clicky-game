import React, { Component } from "react";
import TomatoCard from "./components/TomatoCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import tomatoes from "./images";

class App extends Component {
  // Setting this.state.tomatoes to the tomatoes array
  state = {
    tomatoes,
    count: 0,
    trackedIdArray: []
  };

  // Shuffle functions
  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  shuffleTomatoes = () => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const shuffledTomatoes = this.shuffle(this.state.tomatoes.slice());
    // Set this.state.friends equal to the new friends array
    this.setState({ tomatoes: shuffledTomatoes });
  };

  updateTrackedIdArray = id => {
    const updatedArray = [];
    for(let i = 0; i < this.state.trackedIdArray.length; i++) {
        updatedArray.push(this.state.trackedIdArray[i]);
    };
    updatedArray.push(id);
    this.setState({ trackedIdArray: updatedArray });
}
  

  handleIncrement = (id) => {
    this.setState({ count: this.state.count + 1 });
  };

  // logic for conditions
  comboFunction = id => {
    //searched through array for clicked ids
    if(this.state.trackedIdArray.includes(id)) {
      this.setState({ count: 0, trackedIdArray: [] });
    } else {
      this.handleIncrement();
      this.shuffleTomatoes();
      this.updateTrackedIdArray(id)
    }
  }
 


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    console.log(this.state.trackedIdArray)
    return (
      <Wrapper>
      <Title>Clicky Tomatoes</Title>
      <div className="card-body">
          <p className="card-text">Click Count: {this.state.count}</p>
      </div>
        {this.state.tomatoes.map(tomato => (
          <TomatoCard
            id={tomato.id}
            key={tomato.id}
            image={tomato.image}
            comboFunction={this.comboFunction}
            clickedTomato={tomato.clicked}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

