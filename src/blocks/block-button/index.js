/**
 * BLOCK: Atomic Blocks Button
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CustomButton from './components/button';
import icons from './components/icons';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n; 

// Extend component
const { Component } = wp.element;

// Register block controls
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	UrlInput,
} = wp.blocks;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

class ABButtonBlock extends Component {
	
	render() {

		// Setup the attributes
		const { attributes: { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the alignment toolbar on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ buttonAlignment }
						onChange={ ( value ) => {
							setAttributes( { buttonAlignment: value } );
						} }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			// Show the button markup in the editor
			<CustomButton { ...this.props }>
				<RichText
					tagName="span"
					placeholder={ __( 'Button text...' ) }
					isSelected={ isSelected }
					keepPlaceholderOnFocus
					value={ buttonText }
					formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					className={ classnames(
						'ab-button',
						buttonShape,
						buttonSize,
					) }
					style={ {
						color: buttonTextColor,
						backgroundColor: buttonBackgroundColor,
					} }
					onChange={ (value) => setAttributes( { buttonText: value } ) }
				/>
			</CustomButton>,
			!! this.props.focus && (
				<form
					key="form-link"
					className={ `blocks-button__inline-link ab-button-${buttonAlignment}`}
					onSubmit={ event => event.preventDefault() }
					style={ {
						textAlign: buttonAlignment,
					} }
				>
					<Dashicon icon={ 'admin-links' } />
					<UrlInput
						className="button-url"
						value={ buttonUrl }
						onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
					/>
					<IconButton
						icon="editor-break"
						label={ __( 'Apply' ) }
						type="submit"
					/>
				</form>
			)
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-button', {
	title: __( 'AB Button' ),
	description: __( 'Add a customizable button.' ),
	icon: 'admin-links',
	category: 'common',
	keywords: [
		__( 'button' ),
		__( 'link' ),
		__( 'atomic' ),
	],
	attributes: {
		buttonText: {
			type: 'string',
		},
		buttonUrl: {
			type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'href',
		},
		buttonAlignment: {
			type: 'string',
		},
		buttonBackgroundColor: {
			type: 'string',
			default: '#3373dc'
		},
		buttonTextColor: {
			type: 'string',
			default: '#ffffff'
		},
		buttonSize: {
			type: 'string',
			default: 'ab-button-size-medium'
		},
		buttonShape: {
			type: 'string',
			default: 'ab-button-shape-rounded'
		},
		buttonTarget: {
			type: 'boolean',
			default: false
		},
	},

	// Render the block components
	edit: ABButtonBlock,

	// Save the attributes and markup
	save: function( props ) {
		
		// Setup the attributes
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget } = props.attributes;
		
		// Save the block markup for the front end
		return (
			<CustomButton { ...props }>			
				{	// Check if there is button text and output
					buttonText && (
					<a
						href={ buttonUrl }
						target={ buttonTarget ? '_blank' : '_self' } 
						className={ classnames(
							'ab-button',
							buttonShape,
							buttonSize,
						) }
						style={ {
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
						} }
					>
						{ buttonText }
					</a>
				) }	
			</CustomButton>
		);
	},
} );