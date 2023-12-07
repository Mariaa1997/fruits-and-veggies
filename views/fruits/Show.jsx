const React = require('react');
class Show extends React.Component {
    render () {
        const fruit = this.props.fruit;

        return (
            <div>
                <h1>Show Page</h1>
                <p>The {fruit.name} is {fruit.color}</p>
                {fruit.readyToEat ? 'It is ready to eat' : "NOT READY!"}
            </div>

        )
    }
}

module.exports = Show;