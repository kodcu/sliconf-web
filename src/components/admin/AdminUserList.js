import React from 'react';
import IosCheckmark from 'react-ionicons/lib/IosCheckmark'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import IosArrowUp from 'react-ionicons/lib/IosArrowUp'
import IosRemove from 'react-ionicons/lib/IosRemove'
import ReactTooltip from 'react-tooltip'

const UsersNotAvailable = () => {
    return (
        <tr>
            <td colSpan="6" style={{marginBottom: "10px"}}>No users to be listed!</td>
        </tr>
    )
};

class AdminUserList extends React.Component {

    state = {
        active: "",
        mode: 0,
        users: this.props.admin && this.props.admin.users && this.props.admin.users.returnObject ? this.props.admin.users.returnObject : [],
    };

    returnIcons = (what) => {
        return this.state.active === what ? this.state.mode === 1
            ? <IosArrowUp style={{verticalAlign:"top"}} />
            : <IosArrowDown style={{verticalAlign:"top"}} />
            : <IosRemove rotate={false} style={{verticalAlign:"top"}} />
    };

    sortTable = (what, type) => {
        let cloneUsers = this.props.users ? this.props.users.slice(0) : [];
        if (type) {
            return cloneUsers.sort(function (a, b) {
                if (type === 1) {
                    return a[what].toString().localeCompare(b[what].toString())
                } else if (type === 2) {
                    return b[what].toString().localeCompare(a[what].toString());
                } else {
                    return 0;
                }
            })
        } else {
            return this.props.users;
        }
    };

    changeOrder = (which) => {
        if (which === this.state.active) {
            if (this.state.mode === 1) {
                this.setState({
                    mode: 2,
                    users: this.sortTable(which, 2),
                });
            } else if (this.state.mode === 2) {
                this.setState({
                    mode: 0,
                    active: "",
                    users: this.sortTable(which, 0),
                });
            }
        } else {
            this.setState({
                mode: 1,
                active: which,
                users: this.sortTable(which, 1),
            });
        }
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="twelve columns">
                        <h3>{this.props.title || 'Users'}</h3>
                    </div>
                </div>
                <div className="row events">
                    <div className="twelve columns">
                        <div className="docs-example">

                            <table className="u-full-width">
                                <thead>
                                <tr>
                                    <th onClick={() => {
                                        this.changeOrder("username")
                                    }} style={{textAlign: "center"}}>Username {this.returnIcons("username")}</th>
                                    <th onClick={() => {
                                        this.changeOrder("fullname")
                                    }} style={{textAlign: "center"}}>Full Name {this.returnIcons("fullname")}</th>
                                    <th onClick={() => {
                                        this.changeOrder("email")
                                    }} style={{textAlign: "center"}}>Email {this.returnIcons("email")}</th>
                                    <th onClick={() => {
                                        this.changeOrder("role")
                                    }} style={{textAlign: "center"}}>Role {this.returnIcons("role")}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(this.state.users && this.state.users.length) ? null : <UsersNotAvailable/>}
                                {this.state.users ? this.state.users.map((user) => {
                                    return <tr data-offset="{'top': 2}" key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.fullname}</td>
                                        <td style={{textAlign: "center"}} className="miniCode">{user.email}</td>
                                        <td style={{textAlign: "center"}}>{user.role}</td>
                                    </tr>
                                }) : null}
                                </tbody>
                            </table>
                            <ReactTooltip place="bottom" type="dark" effect="solid"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default AdminUserList