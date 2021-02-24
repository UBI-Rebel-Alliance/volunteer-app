/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import { Form } from "antd";
import styled from "styled-components";
import { mq, theme } from "../../constants/theme";
const { white, darkerGray, royalBlue } = theme.colors;
const { display, body } = theme.typography.font.family;

const StyledForm = styled(Form)`
	p {
		font-family: ${body};
		margin: 1em 0;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px;
		text-align: center;
	}
	.ant-form-item-label {
		font-family: ${body};
	}
	.ant-form-item-control-input-content {
		font-family: ${body};
	}

	&&&.ant-col-14,
	.ant-form-item-control {
		width: 100%;
		max-width: 100%;
	}

	.ant-form-item-control-input-content {
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.ant-form-item-control-input-content .btn-right {
		margin-left: auto;
	}
	.upload-btn {
		margin: auto;
	}
	.ant-upload-list-text {
		position: relative;
		top: -1.5em;
	}
	.ant-upload-list-item-info {
		font-size: 1.5em;
		text-align: left;
		font-family: ${body};
		.ant-upload-list-item-name {
			margin-left: 1em;
		}
		svg {
			font-size: 1.5em;
		}
	}
`;

export default StyledForm;
