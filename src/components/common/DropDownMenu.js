import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

const createOptions = () => {
    const options = [];
    for (let index = 1; index <= 9; index++) {
        options.push({
            key: index,
            text: `Interval ${index} (${index * 200} Records)`,
            value: index
        });
    }
    return options;
};

class DropDownMenu extends Component {

    handleInterval = (e, data) => {
        this.props.handleInterval(data.value)
    }

    render() {
        return (
            <Menu
                key={this.props.interval}>
                <Dropdown
                    options={createOptions()}
                    simple
                    item
                    closeOnChange
                    defaultValue={this.props.interval}
                    onChange={this.handleInterval} />
            </Menu>
        );
    }
};

export default DropDownMenu;
