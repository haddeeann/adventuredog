import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Dogs Adventure`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Dog Adventure" />
        <p>
          You've discovered an empty blog. It's a surprise to both of us. 
          I've written a blog, so whatever you've done to get here...Maybe go someplace else now?
        </p>
        <Bio />
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Dog Adventure" />
      <ol className='blogPosts'>
        {posts.map((post, index) => {
          const title = post.frontmatter.title || post.fields.slug
          const image = getImage(post.frontmatter.hero_image)
          return (
            <li key={post.fields.slug}>
              <div className='article'>
                {index === 0 ? <h1>{siteTitle}</h1> : null}     
                <div className='postImage'>
                  <GatsbyImage image={image} alt={post.frontmatter.hero_image_alt} />
                  <header className='articleHeader'>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                </div>
                {
                  index !== 0 ? (
                    <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                  ) : (<></>)
                }

              </div>
            </li>
          )
        })}
      </ol>
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }
          hero_image_alt
        }
      }
    }
  }
`
