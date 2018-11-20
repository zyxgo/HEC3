import React from "react";
import { observer, inject } from "mobx-react/native";
// import DaftarDiagPage from "../../../stories/screens/admin/DaftarDiagPage";
// import { db } from "../../../firebase";
import * as db1 from "../../../firebase/firebase";

import {
	Icon,
	Text,
	Card,
	View,
	Toast,
	Button,
	Container, Header, Left, Body, Title, Content,
} from "native-base";
import FooterNav from "../../../navigation/FooterNav";
// import moment from "moment";
import styles from "./styles";

export interface Props {
	navigation: any;
	inputConsDiagStore: any;
	mainStore: any;
}
export interface State {
	listDiags;
}

@inject ("inputConsDiagStore", "mainStore")
@observer
export default class DaftarDiagPageContainer extends React.Component<Props, State> {
	taskDiag;

	constructor(props) {
		super(props);
		this.taskDiag = db1.db.ref(`constant`);
		this.state = {
			listDiags: [],
		};
	}

	getFirstData( p ) {
		p.once("value")
			.then((result) => {
				const r1 = [];
				result.forEach(el => {
					r1.push(el.val());
				});
				this.setState({
					listDiags: r1,
				});

			}).catch((err) => {
				console.log(err);
		});
	}

	componentDidMount() {
		this.getFirstData(this.taskDiag);
	}

	componentDidUpdate() {
		this.getFirstData(this.taskDiag);
	}

	_onUpdateDiag( p ) {
		this.props.inputConsDiagStore.namaDiagOnChange(p.namaDiag);
		this.props.inputConsDiagStore.hargaDiagOnChange(p.hargaDiag);
		this.props.inputConsDiagStore.daftarDiagOnUpdate( p );
		this.props.navigation.navigate("InputConsDiagPage", { action: "update"} );
	}

	_onHapusDiag( p ) {
		this.taskDiag.child(`${p.idDiag}`).remove();
		Toast.show({
			text: p.namaDiag + " berhasil di hapus dari database",
			duration: 3000,
			position: "top",
			type: "success",
		});
	}

	render() {
		// console.log(this.state.listDiags);
		const {listDiags } = this.state;
		const viewDiags = (
			<View>
				{ listDiags.map(el =>
					<Card key={el.idDiag}>
						<View padder>
							<View>
								<Text style={styles.headerTitle}>{el.namaDiag}</Text>
								<Text style={styles.postDescription}>Harga: {el.hargaDiag}</Text>
								<View style={styles.view1}>
									<View style={styles.view2}>
										<Button info
											onPress={() => this._onUpdateDiag(el)}
										>
											<Icon name="md-create"/>
											<Text>Ubah</Text>
										</Button>
									</View>
									<View style={styles.view2}>
										<Button info
											onPress={() => this._onHapusDiag(el)}
										>
											<Icon name="md-remove-circle"/>
											<Text>Hapus</Text>
										</Button>
									</View>
								</View>
							</View>
						</View>
					</Card>,
				)}
			</View>
		);

		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>
					<Body style={{ flex: 3 }}>
						<Title>Daftar Diagnosis</Title>
					</Body>
					{/* <Right>
						<Button transparent>
							<Icon
								active
								name="home"
								onPress={() => this.props.navigation.navigate("Home")}
							/>
						</Button>
					</Right> */}
				</Header>

				<Content padder>
					{viewDiags}
				</Content>
				<FooterNav navigation={this.props.navigation} />
			</Container>
		);
	}
}
