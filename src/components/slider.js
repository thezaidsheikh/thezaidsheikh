import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const AddScroll = styled.div`
  width: 100%;
  height: 180px;
  overflow: auto;
`;

export const Slider = ({ slides }) => (
  <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} pagination={{ clickable: true }}>
    <StyledTabPanels>
      {slides &&
          slides.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, url, company, range } = frontmatter;
            return (
              <SwiperSlide key={i}>
                <StyledTabPanel id={`panel-${i}`} role="tabpanel">
                  <h3>
                    <span>{title}</span>
                    <span className="company">
                      &nbsp;@&nbsp;
                      <a href={url} className="inline-link">
                        {company}
                      </a>
                    </span>
                  </h3>

                  <p className="range">{range}</p>

                  <AddScroll dangerouslySetInnerHTML={{ __html: html }} className="addscroll" />
                </StyledTabPanel>
              </SwiperSlide>
            );
          })}
    </StyledTabPanels>
  </Swiper>
);
Slider.propTypes = {
  slides: PropTypes.node,
};
