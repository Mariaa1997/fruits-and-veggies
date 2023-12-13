const React = require ('react');

class Edit extends React.Component {
    render () {
        return (
            <div>
                <h1> Edit The Fruit</h1>
                <form action={`/fruits/${this.props.fruit._id}?_method=PUT`} method="POST">
                    Name: <input type="text" name="name" defaultValue={this.props.fruit.name}/> <br />
                    Color: <input type="text" name="color" defaultValue={this.props.fruit.color}/><br />
                    Is Ready To Eat:
                    { this.props.fruit.readyToEat ? < input type="checkbox" name="readyToEat" defaultChecked /> : <input type="checkbox" name='readyToEat' />}
                    <br />
                    <input type="submit" value="Submit Changes"/>
                </form>
            </div>
        )
    }
}

module.exports = Edit;