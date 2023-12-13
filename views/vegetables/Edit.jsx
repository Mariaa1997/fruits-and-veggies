const React = require ('react');

class Edit extends React.Component {
    render () {
        return (
            <div>
                <h1> Edit The Vegetable</h1>
                <form action={`/vegetables/${this.props.vegetable._id}?_method=PUT`} method="POST">
                    Name: <input type="text" name="name" defaultValue={this.props.vegetable.name}/> <br />
                    Color: <input type="text" name="color" defaultValue={this.props.vegetable.color}/><br />
                    Is Ready To Eat:
                    { this.props.vegetable.readyToEat ? < input type="checkbox" name="readyToEat" defaultChecked /> : <input type="checkbox" name='readyToEat' />}
                    <br />
                    <input type="submit" value="Submit Changes"/>
                </form>
            </div>
        )
    }
}

module.exports = Edit;