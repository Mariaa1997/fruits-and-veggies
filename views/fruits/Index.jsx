const React = require("react");

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    // const fruits = this.props.fruits;

    return (
      <div>
        <h1>Fruits Index Page</h1>
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
        <ul>
          {fruits.map((fruit, i) => {
            return (
              <li>
                The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is{" "}
                {fruit.color} <br></br>
                {fruit.readyToEat
                  ? `It is ready to eat`
                  : `It is NOT ready to eat`}
                <br />
                <a href={`/fruits/${fruit._id}/edit`}> Edit This Fruit</a>
                <form
                  action={`/fruits/${fruit._id}?_method=DELETE`}
                  method="Post"
                >
                  <input type="submit" value="DELETE" />
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
