import React from 'react'
import { Heading } from '@instructure/ui-heading'
import { View } from '@instructure/ui-view'
import { Text } from '@instructure/ui-text'
import { ToggleDetails } from '@instructure/ui-toggle-details'
import { List } from '@instructure/ui-list'
import { IconInfoBorderlessLine, IconNoLine } from '@instructure/ui-icons'
import Html from '../Services/Html'
import ReactHtmlParser from 'react-html-parser'

const issueTypes = [
  "AnchorLinksToMultiMediaRequireTranscript",
  "AnchorLinksToSoundFilesNeedTranscripts",
  "AnchorMustContainText",
  "AnchorSuspiciousLinkText",
  "BaseFontIsNotUsed",
  "BlinkIsNotUsed",
  "ContentTooLong",
  "CssTextHasContrast",
  "CssTextStyleEmphasize",
  "DocumentReadingDirection",
  "EmbedHasAssociatedNoEmbed",
  "FontIsNotUsed",
  "HeadersHaveText",
  "ImageAltIsDifferent",
  "ImageAltIsTooLong",
  "ImageAltNotEmptyInAnchor",
  "ImageAltNotPlaceholder",
  "ImageHasAlt",
  "ImageHasAltDecorative",
  "ImageHasLongDescription",
  "InputImageNotDecorative",
  "MarqueeIsNotUsed",
  "NoHeadings",
  "ObjectInterfaceIsAccessible",
  "ObjectMustContainText",
  "ObjectShouldHaveLongDescription",
  "ObjectTagDetected",
  "ParagraphNotUsedAsHeader",
  "PreShouldNotBeUsedForTabularValues",
  "TableDataShouldHaveTableHeader",
  "TableHeaderShouldHaveScope",
  "VideoCaptionsMatchCourseLanguage",
  "VideoEmbedCheck",
  "VideoProvidesCaptions",
  "VideosEmbeddedOrLinkedNeedCaptions"
]

class AboutPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      expandDetails: false
    }

    this.handleDetailsToggle = this.handleDetailsToggle.bind(this)
  }

  render() {
    const suggestionTypes = this.props.settings.suggestions
    const suggestions = []
    const errors = []

    issueTypes.forEach(issue => {
      if(suggestionTypes.includes(issue)){
        suggestions.push(issue)
      } else {
        errors.push(issue)
      }
    })

    return (
      <View as="div">
        <View as="div">
          <Text as="p" lineHeight="default">{this.props.t('about.description')}</Text>
        </View>
        <View as="div" margin="large 0">
          <Text as="strong">{this.props.t('about.disclaimer_title')}</Text>
          <Text as="p" weight="normal" lineHeight="default">{this.props.t('about.disclaimer')}</Text>
        </View>
        <View as="div" margin="medium 0" display="inline-block">
          <ToggleDetails
            summary={this.props.t('label.btn.udoit_details')}
            expanded={this.state.expandDetails}
            fluidWidth={true}
            onToggle={this.handleDetailsToggle}>
            <View as="div" margin="small large">
              <IconNoLine color="error" />
              <View padding="x-small"><Text weight="bold">{this.props.t('label.plural.error')}</Text><br/></View>
              
              {errors.map((rule) => {
                return (
                  <ToggleDetails key={rule} summary={this.props.t(rule)}>
                    <View as="div" margin="small 0" background="primary" padding="small" shadow="above">
                      <Heading level="h4">{this.props.t(rule)}</Heading>
                      <Text as="p">{ReactHtmlParser(rule.description, { preprocessNodes: (nodes) => Html.processStaticHtml(nodes, this.props.settings) })}</Text>
                      {rule.resources &&
                      <List>
                        {rule.resources.map((resource) => {
                          return (
                            <List.Item key={resource}>
                              {ReactHtmlParser(resource, { preprocessNodes: (nodes) => Html.processStaticHtml(nodes, this.props.settings) })}
                            </List.Item>
                          )
                        })}
                      </List>}

                      {rule.incorrect && 
                      <View>
                        <Text color="danger" weight="bold">
                        {translations.look_for.header.incorrect}:
                      </Text> 
                      <List>
                        {rule.incorrect.map((example) => {
                          return (
                            <List.Item key={example}>
                              {example}
                            </List.Item>
                          )
                        })}
                      </List>
                      </View>}

                      {rule.correct && 
                      <View>
                        <Text color="success" weight="bold">
                        {translations.look_for.header.correct}:
                      </Text> 
                      <List>
                        {rule.correct.map((example) => {
                          return (
                            <List.Item key={example}>
                              {example}
                            </List.Item>
                          )
                        })}
                      </List>
                      </View>}
                    </View>
                  </ToggleDetails>
                )
              })}
            </View>
            <View as="div" margin="small large">
              <IconInfoBorderlessLine color="alert" />
              <View padding="x-small"><Text weight="bold">{this.props.t('label.plural.suggestion')}</Text><br/></View>
              {suggestions.map((rule) => {
                return (
                  <ToggleDetails key={rule} summary={this.props.t(`rule.label.${rule}`)}>
                    <View as="div" margin="small 0" background="primary" padding="small" shadow="above">
                      <Heading level="h4">{this.props.t(`rule.label.${rule}`)}</Heading>
                      <Text as="p">{ReactHtmlParser(this.props.t(`rule.desc.${rule}`), { preprocessNodes: (nodes) => Html.processStaticHtml(nodes, this.props.settings) })}</Text>

                      {rule.resources &&
                      <List>
                        {rule.resources.map((resource) => {
                          return (
                            <List.Item key={resource}>
                              {ReactHtmlParser(resource, { preprocessNodes: (nodes) => Html.processStaticHtml(nodes, this.props.settings) })}
                            </List.Item>
                          )
                        })}
                      </List>}

                      {rule.incorrect && 
                      <View>
                        <Text color="danger" weight="bold">
                        {this.props.t('label.incorrect')}:
                      </Text> 
                      <List>
                        {rule.incorrect.map((example) => {
                          return (
                            <List.Item key={example}>
                              {example}
                            </List.Item>
                          )
                        })}
                      </List>
                      </View>}

                      {rule.correct && 
                      <View>
                        <Text color="success" weight="bold">
                        {this.props.t('label.correct')}:
                      </Text> 
                      <List>
                        {rule.correct.map((example) => {
                          return (
                            <List.Item key={example}>
                              {example}
                            </List.Item>
                          )
                        })}
                      </List>
                      </View>}
                    </View>
                  </ToggleDetails>
                )
              })}
            </View>
          </ToggleDetails>
        </View>
        
      </View>
    )
  }

  handleDetailsToggle() {
    this.setState({expandDetails: !this.state.expandDetails})
  }
}

export default AboutPage